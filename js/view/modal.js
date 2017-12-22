(function(global) {
    var app = global.App || {},
        doc = global.document,
        view = app.view || {};
    view.modal = (function() {
        function appendToBody(element) {
            doc.body.appendChild(element);
        }

        function createModal() {
            var modal = doc.createElement('div');
            modal.id = 'myModal';
            modal.classList.add('modal');
            return modal;
        }

        function closeModal(modal) {
            doc.body.removeChild(modal);
        }

        function createModalContent(modal) {
            var modalContent = doc.createElement('div'),
                span = doc.createElement('span'),
                buttons = doc.createElement('div');
            modalContent.classList.add('modal-content');
            span.innerHTML = '&times;';
            span.classList.add('modal-close');
            span.addEventListener('click', function(e) {e.preventDefault(); closeModal(modal)});
            modalContent.appendChild(span);
            return modalContent;
        }

        function addText(text) {
            var textEl = doc.createElement('p');
            textEl.classList.add('modal-text');
            textEl.innerHTML = text;
            return textEl;
        }

        function createButtons(modal) {
            var button1 = doc.createElement('button'),
                button2 = doc.createElement('button'),
                buttons = doc.createElement('div');
            button1.classList.add('btn', 'success');
            button1.innerHTML = 'OK';
            //button1.addEventListener('click', function(e) {e.preventDefault();});
            button2.classList.add('btn', 'danger');
            button2.innerHTML = 'NO';
            button2.addEventListener('click', function(e) {e.preventDefault(); closeModal(modal);});
            buttons.classList.add('modal-buttons');
            buttons.appendChild(button1);
            buttons.appendChild(button2);
            return buttons;
        }
       
        function showModal(modal) {
            modal.style.display = 'block';
        }

        function attachEventsToButtons(modal, button, callback, getChosenImageSrc, getDifficulty) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                var data = {};
                if (getChosenImageSrc || getDifficulty) {
                    data.imageSrc = getChosenImageSrc();
                    data.difficulty = getDifficulty();
                }
                callback(data);
                closeModal(modal);
            });
        }

        //create object to choose a hero
        function createChooseHeroesModal(heroImages) {
            var clickedImage,
                confirmButton,
                rejectButton,
                modal = createModal(),
                modalContent = createModalContent(modal),
                modalImages = createModalImages(heroImages),
                modalText = addText('Choose your character!'),
                modalText2 = addText('Difficulty:'),
                modalButtons = createButtons(modal);

            function saveConfirmButton(button) {
                confirmButton = button;
            }

            function saveRejectButton(button) {
                rejectButton = button;
            }
            
            function createModalImages(images) {
                var imagesDiv = doc.createElement('div');
                imagesDiv.classList.add('modal-images');
                for (var i = 0, length = images.length; i < length; i += 1) {
                    var image = doc.createElement('img');
                    image.src = images[i];
                    imagesDiv.appendChild(image);
                    if (i === 0) {
                        selectDefaultHero(image);
                    }
                }
                return imagesDiv;
            }

            function attachEventToImages(images, fn) {
                images.addEventListener('click', function(e) {e.preventDefault(); fn(e)})
            }

            function selectDefaultHero(img) {
                img.style.setProperty('border', '3px grey solid');
                clickedImage = img;
            }

            // Set clicked image
            function setClickedImage(event) {
                // frame img with a border
                if (event.target.parentElement.className === 'modal-images') {
                    var newClickedImage = event.target;
                    if (clickedImage != newClickedImage) {
                        if (clickedImage) {
                            clickedImage.style.setProperty('border', 'none');
                            newClickedImage.style.setProperty('border', '3px grey solid'); 
                        } else {
                            newClickedImage.style.setProperty('border', '3px grey solid');
                        }
                    }
                    clickedImage = newClickedImage;
                }
            }

            function onConfirm(callback) {
                attachEventsToButtons(modal, confirmButton, callback, getChosenImageSrc, getDifficulty);
            }

            function onReject(fn) {
                attachEventsToButtons(modal, rejectButton, fn);
            }

            function getChosenImageSrc() {
                return clickedImage.getAttribute('src');
            }

            function createRadios() {
                function createRadioButton(id, name, value, checked) {
                    var x = document.createElement('INPUT');
                    x.setAttribute("id", id);
                    x.setAttribute("type", "radio");
                    x.setAttribute("name", name);
                    x.setAttribute("value", value);
                    if (checked) {
                        x.checked = true;
                    }
                    return x;
                }
                function createLableForRadio(radio, text) {
                    var lb = document.createElement('label'),
                        span1 = document.createElement('span'),
                        span2 = document.createElement('span'),
                        text = document.createTextNode(text);;
                    lb.setAttribute("for", radio.id);
                    lb.appendChild(span1);
                    span1.appendChild(span2);
                    lb.appendChild(text);
                    return lb;
                }
                var div = document.createElement('div');
                div.classList.add('myRadio');
                var radio1 = createRadioButton('myRadio1', 'difficulty', 'easy'),
                    radio2 = createRadioButton('myRadio2', 'difficulty', 'medium', 'checked'),
                    radio3 = createRadioButton('myRadio3', 'difficulty', 'hard'),
                    label1 = createLableForRadio(radio1, 'Easy'),
                    label2 = createLableForRadio(radio2, 'Medium'),
                    label3 = createLableForRadio(radio3, 'Hard');

                div.appendChild(radio1);
                div.appendChild(label1);
                div.appendChild(radio2);
                div.appendChild(label2);
                div.appendChild(radio3);
                div.appendChild(label3);
                return div;
            }

            function getDifficulty() {
                var radios = doc.querySelectorAll('.myRadio input[name=difficulty]'),
                    difficulty;
                radios.forEach(function(radio) {
                    if (radio.checked) {
                        difficulty = radio.value;
                    }
                });
                return difficulty;
            }

            saveConfirmButton(modalButtons.firstElementChild);
            saveRejectButton(modalButtons.firstElementChild.nextSibling);
            attachEventToImages(modalImages, setClickedImage);
            modalContent.appendChild(modalImages);
            modalContent.appendChild(modalText);
            modalContent.appendChild(modalText2);
            modalContent.appendChild(createRadios());
            modalContent.appendChild(modalButtons);
            modal.appendChild(modalContent);
            appendToBody(modal);
            showModal(modal);

            return {
                onConfirm: onConfirm,
                onReject: onReject,
                getChosenImageSrc: getChosenImageSrc,
                getDifficulty: getDifficulty
            };
        }

        // function to create modal with game results
        function createResultGameModal(score) {
            var confirmButton,
                rejectButton,
                modal = createModal(),
                modalContent = createModalContent(modal),
                modalText = addText('Your score: ' + score + '.' + '<br>' + ' Would you like to play again?'),
                modalButtons = createButtons(modal);

            saveConfirmButton(modalButtons.firstElementChild);
            saveRejectButton(modalButtons.firstElementChild.nextSibling);
            modalContent.appendChild(modalText);
            modalContent.appendChild(modalButtons);
            modal.appendChild(modalContent);
            appendToBody(modal);
            showModal(modal);

            function saveConfirmButton(button) {
                confirmButton = button;
            }

            function saveRejectButton(button) {
                rejectButton = button;
            }

            function onConfirm(fn) {
                attachEventsToButtons(modal, confirmButton, fn);
            }

            function onReject(fn) {
                attachEventsToButtons(modal, rejectButton, fn);
            }

            return  {
                        onConfirm: onConfirm,
                        onReject: onReject
                    };
        }

        return  {   
                    createChooseHeroesModal: createChooseHeroesModal,
                    createResultGameModal: createResultGameModal
                };
    })();
    app.view = view;
    global.App = app;
})(this);