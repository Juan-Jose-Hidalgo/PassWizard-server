import * as yup from 'yup';

/**
 * A schema for validating the user input for updating a user.
 * 
 * @property id A number that is required
 * @property name A string that is required and has a minimum of 3 characters and a maximum of 50 characters
 * @property username A string that is required and has a minimum of 3 characters and a maximum of 20 characters
 * @property email A string that is required and has a valid email format
 */
const updateUserSchema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().min(3).max(50).required(),
    username: yup.string().min(3).max(20).required(),
    email: yup.string().email().required()
});

export { updateUserSchema }