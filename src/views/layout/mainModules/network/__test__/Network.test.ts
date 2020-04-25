import {getFileName} from '../handlers/xhr';

test('Test getFileName', () => {
    // expect(getFileName('https://www.jianshu.com/asimov/notes/70a4f026a0f1/mark_viewed')).toBe('mark_viewed')
    expect(getFileName('https://www.jianshu.com/asimov/notes/33141635/comments?count=10&order_by=')).toBe('comments')
    // expect(getFileName('https://www.jianshu.com/')).toBe('www.jianshu.com') 
    // expect(getFileName('https://www.jianshu.com')).toBe('www.jianshu.com')
})