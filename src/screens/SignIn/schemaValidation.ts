import * as Yup from 'yup';

export const schemaValidation = Yup.object().shape({
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: Yup.string().required('Senha obrigatória')
});

export { Yup };
