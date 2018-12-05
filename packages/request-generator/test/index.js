const tape = require('tape')
const requestGenerator = require('../lib')

tape.test(
    'request-generator should generate test collection per path, method, schemes combination',
    async t => {
        const apiDefinition = require('./fixtures/api')

        try {
            const requests = await requestGenerator(apiDefinition)
            t.equals(requests.length, 4)
        } catch (error) {
            t.fail()
        }

        t.end()
    }
)
