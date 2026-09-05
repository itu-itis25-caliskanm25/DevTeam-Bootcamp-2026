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