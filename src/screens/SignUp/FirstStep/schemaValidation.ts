import * as Yup from 'yup';

export const schemaValidation = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  cnh: Yup.string().required('CNH obrigatória')
});

export { Yup };
