/**
 * @file uploader unit test cases
 * @author leon <ludafa@outlook.com>
 */

import Uploader from '../../src/Uploader';
import {mount} from 'enzyme';
import React from 'react';

const IMG_URL = 'http://react-melon.github.io/melon/asset/common/img/melon-logo.ffb5dd37.png';

describe('`Uploader` controlled', () => {

    it('dom', () => {

        const wrapper = mount(
            <Uploader
                value=""
                uploading={false}
                onFileChange={file => {
                    console.log(1231);
                }} />
        );

        expect(wrapper.find('input').length).toBe(2);
        expect(wrapper.state()).toEqual({
            uploading: false,
            value: ''
        });

        wrapper.setProps({uploading: true});

        expect(wrapper.state()).toEqual({
            uploading: true,
            value: ''
        });

        expect(wrapper.find('div.ui-uploader-uploading').length).toBe(1);

        wrapper.setProps({uploading: false, value: 'http://xxxxx'});

        expect(wrapper.state()).toEqual({
            uploading: false,
            value: 'http://xxxxx'
        });

        expect(wrapper.find('div.ui-uploader-uploading').length).toBe(0);
        expect(wrapper.find('.ui-link').length).toBe(1);


    });

    it('onFileChange', () => {

        let files = [{name: 'test'}];

        let wrapper;

        let obj = {
            onFileChange() {
                wrapper.setProps({value: 'aaa'});
            },
            value: ''
        };

        spyOn(obj, 'onFileChange').and.callThrough();

        wrapper = mount(
            <Uploader
                value={obj.value}
                uploading={false}
                onFileChange={obj.onFileChange} />
        );

        let instance = wrapper.instance();

        instance.onFileChange({target: {files}});

        expect(obj.onFileChange).toHaveBeenCalledWith(files);
        expect(wrapper.state('value')).toBe('aaa');

        instance.onClear();
        expect(obj.onFileChange).toHaveBeenCalledWith(null);


    });

    it('onUploadCancel', () => {

        const files = [{name: 'test'}];

        let wrapper;

        const obj = {
            onFileChange() {
                wrapper.setProps({uploading: true});
            },
            onUploadCancel() {
                wrapper.setProps({uploading: false});
            },
            value: ''
        };

        spyOn(obj, 'onFileChange').and.callThrough();
        spyOn(obj, 'onUploadCancel').and.callThrough();

        wrapper = mount(
            <Uploader
                value={obj.value}
                uploading={false}
                onFileChange={obj.onFileChange}
                onUploadCancel={obj.onUploadCancel} />
        );

        const instance = wrapper.instance();

        instance.onFileChange({target: {files}});
        expect(obj.onFileChange).toHaveBeenCalledWith(files);
        expect(wrapper.state('uploading')).toBe(true);
        instance.onUploadCancel();
        expect(obj.onUploadCancel).toHaveBeenCalled();
        expect(wrapper.state('uploading')).toBe(false);

    });


});

// describe('`Uploader` uncontrolled', () => {
// it('dom', () => {
//     const wrapper1 = mount(
//         <Uploader defaultValue="" upload={upload} />
//     );
//
//     expect(wrapper1.state()).toEqual({uploading: false, value: ''});
//     expect(wrapper1.find('input').length).toBe(2);
//
//     wrapper1.unmount();
//
// });
//
//     it('should work', () => {
//
//         let obj = {
//             upload() {
//
//             }
//         };
//
//         const wrapper = mount(
//             <Uploader
//                 defaultValue=""
//                 upload={() => {
//
//                 }} />
//         );
//
//         expect(wrapper.state()).toEqual({uploading: false, value: ''});
//
//         wrapper.setProps({
//             uploading: true
//         });
//
//         expect(wrapper.state()).toEqual({uploading: false, value: ''});
//
//     });
//
// });
//
describe('`Uploader` uncontrolled', () => {

    it('upload succeed', done => {

        const files = [{name: 'test'}];

        const obj = {
            upload() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(IMG_URL);
                    }, 10);
                });
            },
            onUploadSucceed() {
            },
            onUploadFailed() {
            }
        };

        spyOn(obj, 'onUploadSucceed').and.callThrough();
        spyOn(obj, 'onUploadFailed').and.callThrough();
        spyOn(obj, 'upload').and.callThrough();

        const wrapper = mount(
            <Uploader
                defaultValue=""
                upload={obj.upload}
                onUploadSucceed={obj.onUploadSucceed}
                onUploadFailed={obj.onUploadFailed} />
        );

        wrapper.instance().onFileChange({target: {files}});

        expect(obj.upload).toHaveBeenCalledWith(files, jasmine.anything());
        expect(wrapper.state()).toEqual({
            uploading: true,
            value: ''
        });

        setTimeout(() => {
            expect(obj.onUploadSucceed).toHaveBeenCalled();
            expect(obj.onUploadFailed).not.toHaveBeenCalled();
            expect(wrapper.state()).toEqual({
                uploading: false,
                value: IMG_URL
            });
            done();
        }, 50);

    });

    it('upload failed', done => {

        const files = [{name: 'test'}];
        const error = '';

        const obj = {
            upload() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(error);
                    }, 10);
                });
            },
            onUploadSucceed() {
            },
            onUploadFailed() {
            }
        };

        spyOn(obj, 'onUploadSucceed').and.callThrough();
        spyOn(obj, 'onUploadFailed').and.callThrough();
        spyOn(obj, 'upload').and.callThrough();

        const wrapper = mount(
            <Uploader
                defaultValue=""
                upload={obj.upload}
                onUploadSucceed={obj.onUploadSucceed}
                onUploadFailed={obj.onUploadFailed} />
        );

        wrapper.instance().onFileChange({target: {files}});

        expect(obj.upload).toHaveBeenCalledWith(files, jasmine.anything());
        expect(wrapper.state()).toEqual({
            uploading: true,
            value: ''
        });

        setTimeout(() => {
            expect(obj.onUploadSucceed).not.toHaveBeenCalled();
            expect(obj.onUploadFailed).toHaveBeenCalled();
            expect(wrapper.state()).toEqual({
                uploading: false,
                value: ''
            });
            done();
        }, 50);

    });

    it('cancel upload', done => {

        const files = [{name: 'test'}];

        const obj = {
            upload() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(IMG_URL);
                    }, 100);
                });
            },
            onUploadSucceed() {
            },
            onUploadFailed() {
            },
            onUploadCancel() {
            }
        };

        spyOn(obj, 'onUploadSucceed').and.callThrough();
        spyOn(obj, 'onUploadFailed').and.callThrough();
        spyOn(obj, 'onUploadCancel').and.callThrough();
        spyOn(obj, 'upload').and.callThrough();

        const wrapper = mount(
            <Uploader
                defaultValue=""
                upload={obj.upload}
                onUploadSucceed={obj.onUploadSucceed}
                onUploadFailed={obj.onUploadFailed}
                onUploadCancel={obj.onUploadCancel} />
        );

        let instance = wrapper.instance();

        instance.onFileChange({target: {files}});

        expect(obj.upload).toHaveBeenCalledWith(files, jasmine.anything());
        expect(wrapper.state()).toEqual({
            uploading: true,
            value: ''
        });

        instance.onUploadCancel();
        expect(obj.onUploadCancel).toHaveBeenCalled();

        expect(wrapper.state()).toEqual({
            uploading: false,
            value: ''
        });

        setTimeout(() => {
            expect(obj.onUploadSucceed).not.toHaveBeenCalled();
            expect(obj.onUploadFailed).not.toHaveBeenCalled();
            done();
        }, 200);

    });

    it('clear', () => {

        const obj = {
            onClear() {}
        };

        spyOn(obj, 'onClear').and.callThrough();

        const wrapper = mount(
            <Uploader
                upload={() => {}}
                defaultValue={IMG_URL}
                onClear={obj.onClear} />
        );

        const instance = wrapper.instance();

        instance.onClear();

        expect(obj.onClear).toHaveBeenCalled();

        expect(wrapper.state()).toEqual({
            value: '',
            uploading: false
        });

    });

    it('unmount clear async token', done => {

        const files = [{name: 'test'}];

        const obj = {
            upload() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(IMG_URL);
                    }, 100);
                });
            },
            onUploadSucceed() {
            },
            onUploadFailed() {
            },
            onUploadCancel() {
            }
        };

        spyOn(obj, 'onUploadSucceed').and.callThrough();
        spyOn(obj, 'onUploadFailed').and.callThrough();
        spyOn(obj, 'onUploadCancel').and.callThrough();
        spyOn(obj, 'upload').and.callThrough();

        const wrapper = mount(
            <Uploader
                defaultValue=""
                upload={obj.upload}
                onUploadSucceed={obj.onUploadSucceed}
                onUploadFailed={obj.onUploadFailed}
                onUploadCancel={obj.onUploadCancel} />
        );

        let instance = wrapper.instance();

        instance.onFileChange({target: {files}});

        expect(obj.upload).toHaveBeenCalledWith(files, jasmine.anything());
        expect(wrapper.state()).toEqual({
            uploading: true,
            value: ''
        });

        wrapper.unmount();

        expect(instance.token).toBe(null);

        setTimeout(() => {
            expect(obj.onUploadSucceed).not.toHaveBeenCalled();
            expect(obj.onUploadFailed).not.toHaveBeenCalled();
            expect(obj.onUploadCancel).not.toHaveBeenCalled();
            done();
        }, 200);

    });

});
//
//
// describe('controlled', () => {
//
//     it('work', () => {
//
//         class App extends Component {
//
//             constructor(props) {
//                 super(props);
//                 this.onFileChange = this.onFileChange.bind(this);
//                 this.onUploadCancel = this.onUploadCancel.bind(this);
//                 this.state = {
//                     uploading: false,
//                     value: ''
//                 };
//             }
//
//             componentWillUnmount() {
//                 this.token = null;
//             }
//
//             upload(files) {
//                 return new Promise(resolve => {
//                     setTimeout(() => {
//                         resolve('http://some.com/a.png');
//                     }, 10);
//                 });
//             }
//
//             onFileChange(files) {
//                 this.setState({
//                     uploading: true
//                 });
//                 const token = this.token = Math.random();
//                 this.upload(files).then(
//                     value => {
//                         if (this.token === token) {
//                             this.setState({uploading: false, value});
//                         }
//                     },
//                     error => {
//                         if (this.token === token) {
//                             this.setState({uploading: false});
//                         }
//                     }
//                 );
//             }
//
//             onUploadCancel() {
//                 this.token = null;
//                 this.setState({uploading: false});
//             }
//
//             render() {
//                 const {uploading, value} = this.state;
//                 return (
//                     <Uploader
//                         value={value}
//                         uploading={uploading}
//                         onFileChange={this.onFileChange}
//                         onUploadCancel={this.onUploadCancel}
//                     />
//                 );
//             }
//
//         }
//
//     });
//
// });
