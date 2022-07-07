import axios, {AxiosInstance, AxiosResponse} from 'axios';

enum ResultType { Success, Failure };
type Result<T, E> = { type: ResultType.Success, result: T } | { type: ResultType.Failure, error: E };

enum HttpClientError { NetworkFailure, UnknownError };
type HttpClientResponse<T> = Result<T, HttpClientError>;

interface IHttpClient {
    post<T>(path: string, body: T): Promise<HttpClientResponse<T>>
}

class HttpClient implements IHttpClient {
    private httpClient: AxiosInstance;

    post<T>(path: string = "/", body: T): Promise<HttpClientResponse<T>> {
        return this.httpClient.post(path, body)
            .then((response: AxiosResponse<T>) => ({type: ResultType.Success, result: response.data as T}))
            .catch((error: Error) => ({type: ResultType.Failure, error: this.getHttpClientError(error)}));
    }

    private getHttpClientError(error: Error): HttpClientError {
        return error.message.includes("some network failure") ?
            HttpClientError.NetworkFailure :
            HttpClientError.UnknownError;
    }
}

type SoftwareEngineer = { languages: string[], libraries: string[], tools: string[], architectures: string[] };
type Consultant = { practices: string[], patterns: string[] };
type SoftwareConsulting = SoftwareEngineer & Consultant;
type Interests = SoftwareConsulting;
type Bio = { name: string, has_coffee_addiction: boolean };
type User = Bio & { interests: Interests };

enum UserServiceError { UnableToAddUser, UnknownError };

type CreateUserResult = Result<User, UserServiceError>;

interface IUserService {
    createUser(user: User): Promise<CreateUserResult>
}

class UserService implements IUserService {
    private httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient;
    }

    createUser(user: User): Promise<CreateUserResult> {
        return this.httpClient.post("/user/new", user).then(result => {
            switch (result.type) {
                case ResultType.Success:
                    return {type: ResultType.Success, result: result.result};
                case ResultType.Failure:
                    if (result.error == HttpClientError.NetworkFailure) {
                        return {type: ResultType.Failure, error: UserServiceError.UnableToAddUser};
                    } else {
                        return {type: ResultType.Failure, error: UserServiceError.UnknownError};
                    }
            }
        });
    }
}

const sayHello = (userResult: CreateUserResult): CreateUserResult => {
    switch (userResult.type) {
        case ResultType.Success:
            console.log(`Hi ${userResult.result}!`);
            break;
        case ResultType.Failure:
            console.log(`Failure: ${userResult.error}`)
            break;
    }

    return userResult;
};

const addAndGreetUser = (user: User, userService = new UserService(axios.create())): Promise<CreateUserResult> =>
    Promise.resolve(user).then(userService.createUser).then(sayHello);

const _ = addAndGreetUser({
    name: "TJ Maynes",
    has_coffee_addiction: true,
    interests: {
        languages: ["Typescript", "Kotlin", "Java", "Bash", "HTML", "CSS"],
        libraries: ["Spring Boot", "React", "ArrowKt"],
        tools: ["Git", "GNU Make", "Docker", "Kubernetes", "CypressJS", "IntelliJ", "Vim"],
        patterns: ["composition over inheritence", "railway-oriented programming", "documentation thru automation", "strangler"],
        practices: ["agile software development", "test-driven development", "pair programming", "CI/CD"],
        architectures: ["microservices", "SOLID", "clean code"]
    }
});