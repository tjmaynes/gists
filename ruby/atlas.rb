class Atlas
  attr_accessor :docker_compose_files, :environment_variables

  def initialize(supported_programs, environment, vagrant_filepath)
    @docker_compose_files = Dir["**/docker-compose.yml"]
      .map { |filepath| File.join(vagrant_filepath, filepath) }
      .reject { |filepath| supported_programs.select { |program| filepath.include? program }.empty? }

    @environment_variables = Dir["**/.env.#{environment}"]
      .to_h do |filepath|
        program = File.basename(File.dirname(filepath))
        environment_variables = File.open(filepath).read.split("\n")
          .map { |data| data.split("=") }
          .map do |data|
            if data[1].include? "PWD"
              source_directory = File.basename(data[1])
              data = [data[0], File.join("#{vagrant_filepath}/programs", program, source_directory)]
            else
              data
            end
          end
          .to_h {|data| [data[0], data[1]]}

        [program, environment_variables]
      end
      .delete_if { |program, value| supported_programs
        .select { |supported_program| supported_program.include? program }.empty?
      }
      .values.reduce Hash.new, :merge
  end

  def add_environment_variable(key, value)
    @environment_variables[key] = value
  end
end