export { AppError } from "./base/AppError.js";
export {
    HttpError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    ValidationError,
    InternalServerError,
    ServiceUnavailableError,
} from "./base/HttpError.js";
export {
    AIError,
    AIModelError,
    AIRateLimitError,
    AIAuthenticationError,
    AIResponseParseError,
} from "./domain/AIError.js";
export {
    CandidateError,
    CandidateNotFoundError,
    CandidateDuplicateError,
    CandidateValidationError,
} from "./domain/CandidateError.js";
export {
    DatabaseError,
    DatabaseConnectionError,
    DatabaseQueryError,
    DatabaseTransactionError,
} from "./domain/DatabaseError.js";
