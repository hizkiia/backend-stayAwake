const revokedTokens = new Set();

const revokeToken = (token) => {
    revokedTokens.add(token);
}

const isTokenRevoked = (token) => {
    return revokedTokens.has(token);
}

module.exports = {
    revokeToken,
    isTokenRevoked,
}