import * as Yup from 'yup';

export const schemaValidation = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória'),
  confirmPassword: Yup.string().required('Confirme a sua senha')
});

export { Yup };
