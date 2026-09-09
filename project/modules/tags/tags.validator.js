export const validateTag = ({ name }) => {
    if (typeof name !== "string" || name.trim() === "") {
        return false;
    }

    return true;
};
