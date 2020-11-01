export default class GenericUtils {
    public static generateUniqueId (): string {
        return Date.now().toString();
    }
}