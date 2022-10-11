

export const createError = (status, message) => {
	//creating new error
	const err = new Error();
	//assigning status and message properties to err
	err.status = status;
	err.message = message;
	return err;
};
