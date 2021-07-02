import * as Yup from 'yup';

export const schemaValidation = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória'),
  confirmPassword: Yup.string()
    .required('Confirme a sua senha')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
});

export { Yup };
