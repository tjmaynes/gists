use serde::Deserialize;
use std::{env, fmt};

#[derive(Debug, PartialEq)]
pub enum EnvironmentConfigError {
    FileNotFound(String),
    Unknown(String)
}

impl fmt::Display for EnvironmentConfigError {
    fn fmt(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_fmt(format_args!("EnvironmentConfigError(error=\"{}\")", self))
    }
}

impl EnvironmentConfigError {
    pub fn to_string(self) -> String {
        match self {
            EnvironmentConfigError::FileNotFound(filename) => format!("Environment file not found: {}", filename),
            EnvironmentConfigError::Unknown(reason) => reason
        }
    }
}

#[derive(Debug, Deserialize, PartialEq)]
pub struct EnvironmentConfig {
    pub database_url: String,
    pub port: String
}

impl fmt::Display for EnvironmentConfig {
    fn fmt(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_fmt(format_args!(
            "EnvironmentConfig(database_url => \"{}\", port => \"{}\")",
            self.database_url,
            self.port
        ))
    }
}

impl EnvironmentConfig {
    pub fn new() -> Result<Self, EnvironmentConfigError> {
        Self::load_enviroment_file().and_then(|_| Self::generate_environment_config())
    }

    fn generate_environment_config() -> Result<Self, EnvironmentConfigError> {
        match envy::from_env::<EnvironmentConfig>() {
            Ok(config) => Ok(config),
            Err(e) => Err(EnvironmentConfigError::Unknown(
                format!("Unable to parse the environment config: {}", e)
            ))
        }
    }

    fn load_enviroment_file() -> Result<(), EnvironmentConfigError> {
        if let Err(_) = dotenv::from_filename(Self::get_environment_filename()) {
            return Err(EnvironmentConfigError::FileNotFound(Self::get_environment_filename()))
        } else {
            return Ok(())
        }
    }

    fn get_environment_filename() -> String {
        match env::var("ENVIRONMENT") {
            Ok(environment) => format!(".env.{}", environment),
            _ => ".env".to_string()
        }
    }
}

#[cfg(test)]
mod integration_test {
    use crate::config::test_helpers::test_helpers::{with_env_vars};

    use super::*;

    #[test]
    fn when_the_dotenv_file_is_not_available_it_should_return_an_error() {
        with_env_vars(vec![("ENVIRONMENT", Some("not-findable"))], ||
            match EnvironmentConfig::new() {
                Ok(_) => assert!(false, "Should not have created an EnvironmentConfig!"),
                Err(error) => assert_eq!(error, EnvironmentConfigError::FileNotFound(".env.not-findable".to_string()))
            }
        )
    }

    #[test]
    fn when_environment_file_is_found_it_should_return_an_environment_config() {
        with_env_vars(vec![("ENVIRONMENT", Some("development"))], ||
            match EnvironmentConfig::new() {
                Ok(config) => assert_eq!(config, EnvironmentConfig {
                    database_url: std::env::var("DATABASE_URL").expect("'DATABASE_URL' to be set!"),
                    port: std::env::var("PORT").expect("'PORT' to be set!")
                }),
                Err(_) => assert!(false, "Should have created an EnvironmentConfig!")
            }
        )
    }
}