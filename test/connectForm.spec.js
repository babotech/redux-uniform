import * as formActions from '../src/formActions'

import React, {Children, Component, PropTypes} from 'react'
import {Map} from 'immutable'
import TestUtils from 'react-addons-test-utils'

import connectForm from '../src/connectForm'
import {createStore} from 'redux'
import expect from 'expect'
import fieldType from '../src/fieldCreators/fieldType'
import mockery from 'mockery'

describe(`redux-uniform`, () => {

    describe(`connectForm`, () => {

        const createStoreWithForm = (form = Map()) => createStore(() => ({
            states: {
                form: {
                    state: form
                }
            }
        }))

        class Passthrough extends Component {
            render() {
                return (
                    <div {...this.props}/>
                )
            }
        }

        class ProviderMock extends Component {
            getChildContext() {
                return {store: this.props.store}
            }

            render() {
                return React.cloneElement(Children.only(this.props.children), {stateId: `form`})
            }
        }

        ProviderMock.childContextTypes = {
            store: PropTypes.object.isRequired
        }

        const getMockedConnectForm = ({actions, extractValues}) => {
            mockery.enable({
                warnOnUnregistered: false,
                useCleanCache: true
            })

            mockery.registerMock(`./formActions`, actions)
            mockery.registerMock(`./extractValues`, extractValues)

            const {default: mockedConnectForm} = require(`../src/connectForm`)

            mockery.disable()
            mockery.deregisterAll()

            return mockedConnectForm
        }

        it(`should provide fields property into a wrapped component`, () => {

            const store = createStoreWithForm()


            class Container extends Component {
                render() {
                    return <Passthrough {...this.props} />
                }
            }

            const ContainerForm = connectForm({
                foo: fieldType()
            })(Container)

            const tree = TestUtils.renderIntoDocument(
                <ProviderMock store={store}>
                    <ContainerForm />
                </ProviderMock>
            )

            const passthrough = TestUtils.findRenderedComponentWithType(tree, Passthrough)

            const {fields} = passthrough.props

            expect(fields)
                .toExist()

            expect(fields.foo)
                .toExist()
        })

        it(`should provide validity property into a wrapped component`, () => {

            const store = createStoreWithForm()

            const fooValidate = () => false

            class Container extends Component {
                render() {
                    return <Passthrough {...this.props} />
                }
            }

            const ContainerForm = connectForm({
                foo: fieldType(fooValidate)
            })(Container)

            const tree = TestUtils.renderIntoDocument(
                <ProviderMock store={store}>
                    <ContainerForm />
                </ProviderMock>
            )

            const passthrough = TestUtils.findRenderedComponentWithType(tree, Passthrough)

            expect(passthrough.props.valid)
                .toEqual(false)
        })

        it(`should call initialize action before mount`, () => {

            const store = createStoreWithForm()
            const initialValue = {
                foo: `bar`
            }

            class Container extends Component {
                render() {
                    return <div />
                }
            }

            const initializeSpy = expect
                .spyOn(formActions, `initialize`)
                .andCallThrough()


            const mockedConnectForm = getMockedConnectForm({
                actions: formActions
            })

            const ContainerForm = mockedConnectForm()(Container)

            try {
                TestUtils.renderIntoDocument(
                    <ProviderMock store={store}>
                        <ContainerForm initialValue={initialValue}/>
                    </ProviderMock>
                )

                expect(formActions.initialize.calls.length).toEqual(1)

                const {arguments: args} = formActions.initialize.calls[ 0 ]

                expect(args).toEqual([
                    initialValue
                ])
            } finally {
                initializeSpy.restore()
            }
        })

        it(`should provide submitting property into a wrapped component`, () => {

            const store = createStoreWithForm(Map({
                submitting: true
            }))

            class Container extends Component {
                render() {
                    return <Passthrough {...this.props} />
                }
            }

            const ContainerForm = connectForm()(Container)

            const tree = TestUtils.renderIntoDocument(
                <ProviderMock store={store}>
                    <ContainerForm />
                </ProviderMock>
            )

            const passthrough = TestUtils.findRenderedComponentWithType(tree, Passthrough)

            expect(passthrough.props.submitting)
                .toEqual(true)
        })

        it(`should provide handleSubmit method into a wrapped component`, () => {
            const submitSpy = expect
                .spyOn(formActions, `submit`)
                .andCallThrough()

            const store = createStoreWithForm()

            const promise = Promise.resolve()
            const sendValues = expect.createSpy()
                .andReturn(promise)

            class Container extends Component {
                render() {
                    return <Passthrough {...this.props} />
                }
            }

            const ContainerForm = connectForm()(Container)

            try {
                const tree = TestUtils.renderIntoDocument(
                    <ProviderMock store={store}>
                        <ContainerForm />
                    </ProviderMock>
                )

                const passthrough = TestUtils.findRenderedComponentWithType(tree, Passthrough)

                const {handleSubmit} = passthrough.props

                expect(handleSubmit).toExist()

                handleSubmit(sendValues)

                expect(submitSpy.calls.length).toEqual(1)

                const {arguments: args} = submitSpy.calls[ 0 ]

                expect(args).toEqual([
                    promise
                ])
            } finally {
                submitSpy.restore()
            }
        })

        it(`should provide submitting property into a wrapped component`, () => {

            const store = createStoreWithForm(Map({
                submitting: true
            }))

            class Container extends Component {
                render() {
                    return <Passthrough {...this.props} />
                }
            }

            const ContainerForm = connectForm()(Container)

            const tree = TestUtils.renderIntoDocument(
                <ProviderMock store={store}>
                    <ContainerForm />
                </ProviderMock>
            )

            const passthrough = TestUtils.findRenderedComponentWithType(tree, Passthrough)

            expect(passthrough.props.submitAllowed)
                .toEqual(false)
        })

        it(`should provide getValues method into a wrapped component`, () => {
            const store = createStoreWithForm()

            class Container extends Component {
                render() {
                    return <Passthrough {...this.props} />
                }
            }

            const ContainerForm = connectForm()(Container)

            const tree = TestUtils.renderIntoDocument(
                <ProviderMock store={store}>
                    <ContainerForm />
                </ProviderMock>
            )

            const passthrough = TestUtils.findRenderedComponentWithType(tree, Passthrough)

            expect(passthrough.props.getValues)
                .toExist()
        })
    })
})