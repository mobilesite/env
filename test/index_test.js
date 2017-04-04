/**
 * assert(value[, message]) 相当于assert.ok(value[, message])
 * assert.strictEqual(actual, expected[, message])
 * assert.equal(actual, expected[, message])
 * assert.notEqual(actual, expected[, message])
 * assert.strictEqual(actual, expected[, message])
 * assert.notStrictEqual(actual, expected[, message])
 * assert.deepEqual(actual, expected[, message])
 * assert.notDeepEqual(actual, expected[, message]) // 判断两个对象是否不是deeply equal
 * assert.deepStrictEqual(actual, expected[, message])
 * assert.notDeepStrictEqual(actual, expected[, message])
 * assert.throws(block[, error][, message])
 * assert.doesNotThrow(block[, error][, message])
 * assert.fail(actual, expected, message, operator)
 * assert.ifError(value) // Throws value if value is truthy.
 */
import chai from 'chai'; // assert是Node.js自带的断言模块
import env from '../src/index.js';

import jsdom from 'mocha-jsdom';

chai.should();

const Version = env.Version;

describe('env', () => {
    describe('libVersion', () => {
        it('返回当前库的版本号正确', () => {
            env.libVersion.should.equal('0.0.1');
        });
    });

    describe('Version()', () => {
        it('传入合法的版本号，返回指定的版本号', () => {
            new Version('1.2.3').version.should.equal('1.2.3');
        });

        it('传入非法的版本号，返回空字符串', () => {
            new Version(undefined).version.should.equal('');
            new Version(NaN).version.should.equal('');
            new Version(null).version.should.equal('');
            new Version({ a: 123 }).version.should.equal('');
        });

        it('高版本大于低版本', () => {
            new Version('1.2.3').gt('0.2.3').should.equal(true);
        });

        it('低版本小于高版本', () => {
            new Version('1.2.3').lt('2.2.3').should.equal(true);
        });

        it('相同的版本应该相等', () => {
            new Version('1.2.3').eq('1.2.3').should.equal(true);
        });

        it('高版本大于等于低版本', () => {
            new Version('1.2.3').gte('0.2.3').should.equal(true);
        });

        it('某版本大于等于其相同版本', () => {
            new Version('1.2.3').gte('1.2.3').should.equal(true);
        });

        it('低版本小于等于高版本', () => {
            new Version('1.2.3').lte('2.2.3').should.equal(true);
        });

        it('某版本小于等于其相同版本', () => {
            new Version('1.2.3').lte('2.2.3').should.equal(true);
        });
    });

    describe('app', () => {
        const arr = [{
            name: 'WeChat',
            ua: 'MicroMessenger'
        },
        {
            name: 'Weibo',
            ua: 'Weibo'
        }];

        arr.map((item) => {
            before(() => {
                /* eslint-disable no-undef */
                global.window = {
                    navigator: {
                        userAgent: item.ua
                    }
                };
                thirdapp = rerequire('../src/thirdapp').default;
                /* eslint-enable no-undef */
            });

            it(`在${item.name}容器中`, () => {
                env.app[`is${item.name}`].should.equal(true);
            });
            return false;
        });
    });
});
