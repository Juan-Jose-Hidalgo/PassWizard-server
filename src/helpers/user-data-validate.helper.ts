import * as yup from 'yup';

const updateUserSchema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().min(3).max(50).required(),
    username: yup.string().min(3).max(20).required(),
    email: yup.string().email().required()
});

export { updateUserSchema }