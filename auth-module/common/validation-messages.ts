export const validationMessages = {
  userName: {
    required: 'Name should not be blank',
    minlength: 'Name should be longer then 3 chars'
  },
  userEmail: {
    required: 'Email should not be blank',
    pattern: 'Email is not valid'
  },
  userPassword: {
    required: 'Password should not be blank',
    match: 'Passwords doesn\'t match'
  }
};
