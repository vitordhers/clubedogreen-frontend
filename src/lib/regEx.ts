const emailRegEx =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
const passwordRegEx = /^(?=.*[a-z]|[A-Z])(?=.*[0-9])(?=.{6,24})/

export { emailRegEx, passwordRegEx }
