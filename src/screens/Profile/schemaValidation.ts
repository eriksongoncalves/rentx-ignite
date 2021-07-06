import * as Yup from 'yup';

const schemaEditProfileValidation = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  driver_license: Yup.string().required('CNH obrigatória')
});

const schemaEditPasswordValidation = Yup.object().shape({
  oldPassword: Yup.string().required('Senha atual obrigatória'),
  password: Yup.string().required('Nova senha obrigatória'),
  confirmPassword: Yup.string()
    .required('Confirme a sua senha')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
});

export { Yup, schemaEditProfileValidation, schemaEditPasswordValidation };
