import { getElement } from 'just-dom';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const setRangeSlider =  (rangeSliderRef) => {
    noUiSlider.create(rangeSliderRef, {
        start: [0, 1500],
        connect: true,
        tooltips: true,
        formatter: "integer",
        range: {
            min: 0,
            max: 1500
        },
        step: 1,
        /* cssPrefix: '', */
    });

    //Modifico il target dello slider
    rangeSliderRef.classList += ' !h-[0.75rem] !rounded-full !bg-neutral/50 !border-[0px] !shadow-none'

    //Modifico il connect (ovvero la parte selezionata)
    const connectRangeSlider = rangeSliderRef.querySelector('.noUi-connect') 
    connectRangeSlider.classList += ' !bg-accent'

    //Modifico gli handles (le due maniglie per muovere i range)
    const handlesRangeSlider = rangeSliderRef.querySelectorAll('.noUi-handle')
    handlesRangeSlider.forEach(handle => {
        handle.classList += ' !bg-base-100 !border-[4px] !border-white !rounded-full !h-6 !w-6 !shadow-none before:!hidden after:!hidden';
    });

    //Modifico la touch area
    const touchesRangeSlider = rangeSliderRef.querySelectorAll('.noUi-touch-area')
    touchesRangeSlider.forEach(touch => {
        touch.classList += ' !bg-base-100 !rounded-full !start-[0]';
    })

    //Modifico i tooltipo
    const toolsRangeSlider = rangeSliderRef.querySelectorAll('.noUi-tooltip')
    toolsRangeSlider.forEach(tool => {
        tool.classList += ' !bg-primary !body-sm !text-neutral-content !shadow-base-300/20 !py-1 !px-2 !rounded-selector !bottom-[-2.5rem]'
    })
}

export default setRangeSlider;