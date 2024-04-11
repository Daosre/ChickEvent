const express = require('express')
const { extractToken } = require('../../Utils/extractToken')
const router = express.Router()

router.route('/mine', extractToken)