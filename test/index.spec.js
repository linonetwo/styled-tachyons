import {expect} from 'chai'
import main from '../src/index'

describe('main export', () => {
	it('is not undefined', () => {
		expect(main).not.to.be.undefined
	})
})
