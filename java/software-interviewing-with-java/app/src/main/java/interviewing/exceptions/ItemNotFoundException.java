package interviewing.exceptions;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}
