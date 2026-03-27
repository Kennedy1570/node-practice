//mock firebase 
function fakeFirebaseLogin(email, password) {
  return new Promise((resolve, reject) => {
    if (email === 'test@email.com' && password === 'password123') {
      resolve({ uid: '123', email });
    } else {
      reject(new Error('Invalid credentials'));
    }
  });
}

module.exports = {fakeFirebaseLogin};