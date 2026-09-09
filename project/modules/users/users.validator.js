export const validateAddUser = (req, res, next) => {
    const { username, email, password } = req.body;

    if(
        !username||
        !email||
        !password||
        typeof username !== "string"||
        typeof email !== "string"||
        typeof password !== "string"
    ){
        return res.status(400).json({
            error: "Username, email and password are required and must be strings",
        });
    }

    if(!email.includes("@")){
        return res.status(400).json({
            error: "Email must contain @",
        });
    }

    next();
};

export const validateProfile = (req, res, next) => {
    const { bio } = req.body;

    if (typeof bio !== "string" || bio.trim() === "") {
        return res.status(400).json({
            error: "Bio is required and must be a non-empty string",
        });
    }

    next();
};
