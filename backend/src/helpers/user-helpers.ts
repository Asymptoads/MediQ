import  {userModel}  from '../models/user.model';

// returns all the entries of users
export const getUsers = () => userModel.find();

// returns user entry by comparing email
export const getUserByEmail = (email: string) => userModel.findOne({ email });

// returns user entry by comparing sessionToken (which is in cookie)
export const getUserBySessionToken = (sessionToken: string) => {
    return userModel.findOne({
        'authentication.sessionToken': sessionToken,
    });
};

// returns user entry by comparing id
export const getUserById = (id: string) => userModel.findById(id);

// creates a new user saves it in entries of userModel then returns the created user object
export const createUser = (values: Record<string, any>) =>
    new userModel(values).save().then((user) => user.toObject());

// deletes user entry by comparing id
export const deleteUserById = (id: string) =>
    userModel.findOneAndDelete({ _id: id });

// updates attribues of specific entry by comparing id
export const updateUserById = (id: string, values: Record<string, any>) =>
    userModel.findByIdAndUpdate(id, values);
