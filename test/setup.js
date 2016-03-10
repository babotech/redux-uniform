import expect from 'expect'
import expectImmutable from 'expect-immutable'
import { jsdom } from 'jsdom'

global.document = jsdom(`<!doctype html><html><body></body></html>`)
global.window = document.defaultView
global.navigator = global.window.navigator

expect.extend(expectImmutable)


