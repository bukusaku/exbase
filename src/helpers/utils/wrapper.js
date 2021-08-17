const { NotFoundError, InternalServerError, BadRequestError, ConflictError,
  ForbiddenError, UnauthorizedError } = require('../error');
const { ERROR:httpError } = require('../http-status/status-code');


const data = (data) => ({ error: null, data});

const error = (error) => ({ error, data: null });

const response = (res, type, result, message = '', responseCode = 200) => {
 let status, data, code;
console.log(result);
 status = true;
 data = result.data;
 code = responseCode;

 if (type === 'fail') {
   const errorCode = result.error.code;
   status = false;
   data = result.error.data || '';
   message = message;
   code = errorCode;
   responseCode = errorCode;
 }

 let modelResponse = {
  success: status,
  data,
  message,
  code
 };

 res.status(responseCode).send(modelResponse);
};

module.exports = {
  data,
  error,
  response
};