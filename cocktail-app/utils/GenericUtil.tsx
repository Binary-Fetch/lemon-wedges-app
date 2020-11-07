export default class GenericUtils {
    public static generateUniqueId (): string {
        return Date.now().toString();
    }

    public static generateAvatarTitle(name: string): string {
        if(!name)
            return " ";
        const nameParts: string[] = name.split(" ");
        if(nameParts.length > 1) {
            const givenNameFirstChar: string = nameParts[0].charAt(0) ? nameParts[0].charAt(0) : ' ';
            const familyNameFirstChar: string = nameParts[nameParts.length-1].charAt(0) ? nameParts[nameParts.length-1].charAt(0) : ' ';
            return `${givenNameFirstChar.toUpperCase()}${familyNameFirstChar.toUpperCase()}`
        }else {
            return (nameParts[0] && nameParts[0].charAt(0)) ? nameParts[0].charAt(0).toUpperCase() : ' ';
        }
    }
}