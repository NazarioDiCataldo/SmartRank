import DOM from 'just-dom';
import Newsletter from './Newsletter';

const social = [
    {
        link: '#',
        src: './facebook.svg',
        label: 'Link al profilo Facebook di SmartRank'
    },
    {
        link: '#',
        src: './instagram.svg',
        label: 'Link al profilo Instagram di SmartRank'
    },
    {
        link: '#',
        src: './youtube.svg',
        label: 'Link al profilo YouTube di SmartRank'
    },
];

const AAsButton = ({link, src, label}) => {
    return DOM.a({href: link, className: 'btn bg-white/60 rounded-[10px] border-0 px-[10px] py-[12px] transition-all duration-300 hover:brightness-[1.1] focus:outline-0 active:scale[0.98]'}, [
        DOM.img({src, ariaHidden:'true'}),
        DOM.span({className: 'sr-only'}, label)
    ])
}

const Footer = () => {
    return DOM.footer({className: 'py-8 lg:pt-18'}, [
        DOM.div({className: 'container text-center mx-auto'},[
            DOM.h3({className: 'fs-3 mb-4'}, ['Iscrivi alla nostra newsletter']),
            DOM.p({className: 'text-white/60 mb-4'}, ['Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus amet dui quam vitae quis leo.']),
            Newsletter(),
            DOM.div({className: 'flex gap-4 justify-center py-8 border-0 border-white/60 border-b-[1px]'}, [
                ...social.map(s => AAsButton(s))
            ]),
            DOM.p({className:'text-white/60 body-xs mt-8'},['Copyright © 2025 SmartRank | All Rights Reserved | Terms and Conditions | Privacy Policy'])
        ])
    ]);
}

export default Footer;