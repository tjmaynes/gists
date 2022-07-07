public static class Extensions {
    public static T? FindFirst<T>(this T[] array, Func<T, bool> fn) where T : struct
    {
        try { return array.First(fn); }
        catch (ArgumentNullException) { return null; }
        catch (InvalidOperationException) { return null; }
    }
}