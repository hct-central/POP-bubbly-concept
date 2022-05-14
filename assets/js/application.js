// text slider

const text = document.querySelector('.text');
const slider = document.querySelector('.text-weight');

slider.addEventListener('input', (e) => {
        let weight = slider.value;
        text.style = "font-variation-settings: 'wght'" + weight;
        text.style.transition = 'unset';
});

// styles

const styles = document.querySelectorAll('.styles-style');

styles.forEach((style) => {
    style.addEventListener('click', (e) => {
        let weight = style.dataset.weight;
        let current = slider.value;

        text.style.fontVariationSettings = "'wght'" + weight;
        text.style.transition = 'all .3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        slider.value = weight;
    });
});


// charset

const overview = document.querySelector('.charset-overview');
const chars = overview.querySelectorAll('button');
const detail = document.querySelector('.charset-detail');

chars.forEach((char) => {
    char.addEventListener('click', (e) => {
        if(! document.body.classList.contains('body--firemode')) {
            chars.forEach((char) => {
                char.classList.remove('active');
            });

            char.classList.add('active');

            if(char.parentNode.classList.contains('lig')) {
                detail.classList.add('lig');
            }
            else {
                detail.classList.remove('lig');
            }

            if(char.parentNode.classList.contains('ss01')) {
                detail.classList.add('ss01');
            }
            else {
                detail.classList.remove('ss01');
            }

            if(char.parentNode.classList.contains('tf')) {
                detail.classList.add('tf');
            }
            else {
                detail.classList.remove('tf');
            }
            
            let charContent = char.innerHTML;
            detail.querySelector('span').innerHTML = charContent;
            detail.classList.remove('charset-detail--animated');
            detail.offsetHeight;
            detail.classList.add('charset-detail--animated');
        }
        
    });

});

// mobile sticky fix

// is in viewport function
isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    const html = document.documentElement;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    )
}

window.addEventListener('scroll', (e) => {

    for(let index = 27; index < chars.length-110; index++) {
        if(isInViewport(chars[index])) {
            detail.classList.add('charset-detail--visible');
            break;
        }
    
        else {
            detail.classList.remove('charset-detail--visible');
        }
    }

});




const preventDef = (e) => {
    e.preventDefault();
}

// modes

modes = (e) => {

    const editables = document.querySelectorAll('.editable');
    const shootables = document.querySelectorAll('.shootable');
    const links = document.querySelectorAll('a:not(.credits-link)');
    const btns = document.querySelectorAll('button');
    const h1 = document.querySelector('h1');
    const slider = document.querySelector('.text-weight');
    const boom = document.querySelector('.boom');
    const blocked = document.querySelector('.blocked');
    const score = document.querySelector('.score');
    const btnrefresh = document.querySelector('.toolbar-btn--refresh');


    // text mode
    if(document.body.classList.contains('body--textmode')) {
    
        // center main title text
        h1.style.textAlign = 'center';

        // make links non-hoverable and non-clickable
        links.forEach((link) => {
            link.addEventListener('click', preventDef);
            link.addEventListener('hover', preventDef);
        });

        // make slider non-slideable
        // slider.setAttribute('disabled', 'true');
    
        // make text editable onclick approach
        editThis = (e) => {
            let target = e.currentTarget;
            let maxlength = target.dataset.maxLength;

            // enable refresh button
            btnrefresh.classList.remove('toolbar-btn--refresh--disabled');

            // block enter
            if (e.keyCode === 13) {
                e.preventDefault();
            }

            // set max character count and block everything but backspace and delete
            if(!(e.keyCode === 8) || (e.keyCode === 46)) {
                if(target.innerText.length > maxlength) {
                    e.preventDefault();
                    target.classList.add('editable--blocked');
                    
                    if(blocked.paused) {
                        blocked.load();
                        blocked.currentTime = 0;
                        blocked.play();
                    }

                    setTimeout((e) => {
                        target.classList.remove('editable--blocked');
                    }, 800);
                }
            }
        };

        // make text editable
        editables.forEach((editable) => {
            editable.setAttribute('contenteditable', 'true');
            editable.setAttribute('onkeydown', 'editThis(event)');
        });
    }

    else {
        editables.forEach((editable) => {
            editable.setAttribute('contenteditable', 'false');
            editable.removeAttribute('onkeydown');
        });

        links.forEach((link) => {
            link.removeEventListener('click', preventDef);
            link.removeEventListener('hover', preventDef);
        });
    }


    // fire mode
    if(document.body.classList.contains('body--firemode')) {

        // make slider non-slideable
        slider.setAttribute('disabled', 'true');

        // make things shootable onclick approach
        shootThis = (e) => {
            e.preventDefault();

            // enable refresh button
            btnrefresh.classList.remove('toolbar-btn--refresh--disabled');

            let target = e.currentTarget;

            if(! target.classList.contains('shot')) {
                document.body.classList.add('body--shotsfired');

                setTimeout((e) => {
                    document.body.classList.remove('body--shotsfired');
                }, 400);
    
    
                boom.load();
                boom.currentTime = 0;
                boom.play();
    
                // score
                let scoreVal = parseInt(score.innerHTML);
                const scorePlus = 100;

                score.innerHTML = scoreVal+scorePlus;
                score.classList.add('score--animated');

                setTimeout((e) => {
                    score.classList.remove('score--animated');
                }, 400);

                target.classList.add('shot');
            }

            // check if all elements are shot and show notification
            const noteShot = document.querySelector('.notification-shotall');

            if(score.innerHTML == '31100') {
                noteShot.classList.add('notification--visible');
            }
        }

        shootables.forEach((shootable) => {
            shootable.setAttribute('onclick', 'shootThis(event)');
        });

    }

    else {
        shootables.forEach((shootable) => {
            shootable.removeAttribute('onclick');
        });

        slider.removeAttribute('disabled');
    }

    

    // select mode
    if(document.body.classList.contains('body--selectmode')) {
        // re-enable
        slider.removeAttribute('disabled');

        links.forEach((link) => {
            link.removeEventListener('click', preventDef);
            link.removeEventListener('hover', preventDef);
        });
    }
}


// refresh
refresh = (e) => {
    const editables = document.querySelectorAll('.editable');
    const shootables = document.querySelectorAll('.shootable');
    const score = document.querySelector('.score');
    const refreshscreen = document.querySelector('.refreshscreen');
    const btnrefresh = document.querySelector('.toolbar-btn--refresh');

    refreshscreen.classList.add('refreshscreen--visible');

    setTimeout((e) => {
        editables.forEach((editable) => {
            let originalText = editable.dataset.originalText;
            editable.innerHTML = originalText;
        });

        shootables.forEach((shootable) => {
            shootable.classList.remove('shot');
        });

        score.innerText = '0';
        scoreVal = parseInt(score.innerHTML);

        btnrefresh.classList.add('toolbar-btn--refresh--disabled');
        btnrefresh.blur();

        refreshscreen.classList.remove('refreshscreen--visible');
    }, 1200);
}


// toolbar
const btnselect = document.querySelector('.toolbar-selectmode');
const btntext = document.querySelector('.toolbar-textmode');
const btnfire = document.querySelector('.toolbar-firemode');
const btnrefresh = document.querySelector('.toolbar-btn--refresh');


btnselect.addEventListener('click', (e) => {
    document.body.classList.remove('body--textmode');
    document.body.classList.remove('body--firemode');
    document.body.classList.add('body--selectmode');

    btnfire.classList.remove('toolbar-btn--active');
    btntext.classList.remove('toolbar-btn--active');
    btnselect.classList.add('toolbar-btn--active');

    modes();
});

btntext.addEventListener('click', (e) => {
    document.body.classList.remove('body--selectmode');
    document.body.classList.remove('body--firemode');
    document.body.classList.add('body--textmode');

    btnfire.classList.remove('toolbar-btn--active');
    btnselect.classList.remove('toolbar-btn--active');
    btntext.classList.add('toolbar-btn--active');

    modes();
});

btnfire.addEventListener('click', (e) => {
    document.body.classList.remove('body--selectmode');
    document.body.classList.remove('body--textmode');
    document.body.classList.add('body--firemode');

    btnselect.classList.remove('toolbar-btn--active');
    btntext.classList.remove('toolbar-btn--active');
    btnfire.classList.add('toolbar-btn--active');

    modes();
});

btnrefresh.addEventListener('click', (e) => {
    document.body.classList.remove('body--textmode');
    document.body.classList.remove('body--firemode');
    document.body.classList.add('body--selectmode');

    btnfire.classList.remove('toolbar-btn--active');
    btntext.classList.remove('toolbar-btn--active');
    btnselect.classList.add('toolbar-btn--active');

    refresh();
    setTimeout((e) => {
        modes();
    }, 20);
});


// close notifications
const notifications = document.querySelectorAll('.notification');
notifications.forEach((notification) => {
    notification.addEventListener('click', (e) => {
        notification.classList.remove('notification--visible');
    });
});

// unlock toolbar and text mode
unlockTextMode = (e) => {
    const toolbar = document.querySelector('.toolbar');
    const noteToolbar = document.querySelector('.notification-toolbar');
    const noteTextmode = document.querySelector('.notification-textmode');

    toolbar.classList.add('toolbar--visible');
    noteToolbar.classList.add('notification--visible');
    setTimeout((e) => {
        noteTextmode.classList.add('notification--visible');
    }, 200);
}

// trigger unlockTextMode

// setTimeout((e) => {
//     unlockTextMode();
// }, 5000);

let unlockTextModeKey = false;

window.addEventListener('scroll', (e) => {
    if (((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50)) && (unlockTextModeKey === false)) {
        unlockTextModeKey = true;

        setTimeout((e) => {
            unlockTextMode();
        }, 5000);
    }
});

// unlock firemode
unlockFireMode = (e) => {
    const buttonFiremode = document.querySelector('.toolbar-firemode');
    const noteFiremode = document.querySelector('.notification-firemode');

    buttonFiremode.classList.add('toolbar-firemode--visible');
    noteFiremode.classList.add('notification--visible');
}

// trigger unlockFireMode

// setTimeout((e) => {
//     unlockFireMode();
// }, 10000);

const refreshbtn = document.querySelector('.toolbar-btn--refresh');
let unlockFireModeKey = false;

refreshbtn.addEventListener('click', (e) => {
    if(unlockFireModeKey === false) {
        setTimeout((e) => {
            unlockFireModeKey = true;
            unlockFireMode();
        }, 5000);
    }
});