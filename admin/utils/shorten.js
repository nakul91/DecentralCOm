export const shortenAddress = (str, isLengthier) => {
    if (!str) {
        return "";
    }
    if (str && isLengthier) {
        return (
            str.substring(0, 15) + "..." + str.substring(str.length - 15, str.length)
        );
    } else if (str.length > 20) {
        return (
            str.substring(0, 5) + "..." + str.substring(str.length - 23, str.length)
        );
    }
    return str;
};