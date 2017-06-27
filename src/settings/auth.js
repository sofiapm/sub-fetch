const {dialog} = require('electron').remote
const path = require('path')

const SubtitlesUserManager = require(path.resolve('src/open-subtitles/open-subtitles-user-manager'))
const UserDataManager = require(path.resolve('src/user-data/user-data-manager'))
const userDataManager = new UserDataManager()
let userManager = {}

const username = document.getElementById('username')
const password = document.getElementById('password')
const loginButton = document.getElementById('login')
const logoutButton = document.getElementById('logout')

if (userDataManager.get('username') && userDataManager.get('password')) {
  username.value = userDataManager.get('username')
  password.value = userDataManager.get('password')

  login()
}

function enableLogout (token) {
  logoutButton.style.display = 'block'
  loginButton.style.display = 'none'
  username.disabled = true
  password.disabled = true

  userDataManager.setToken(token)
  userDataManager.setUsernamePassword(username.value, password.value)
}

function enableLogin () {
  logoutButton.style.display = 'none'
  loginButton.style.display = 'block'
  username.disabled = false
  password.disabled = false
  password.value = ''

  userDataManager.cleanUsernamePassword(username.value, password.value)
  userDataManager.cleanToken()
}

function login () {
  try {
    userManager = new SubtitlesUserManager(username.value, password.value)
    userManager.login(enableLogout, errorDialog)
  } catch (error) {
    errorDialog('Login Error', error.message)
  }
}

function logout () {
  userManager.logout(userDataManager.get('token'), enableLogin, errorDialog)
}

loginButton.onclick = login
logoutButton.onclick = logout

function errorDialog (title, message) {
  dialog.showErrorBox(title, message)
}
