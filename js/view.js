(function(global) {
    var app = global.App || {},
        doc = document;
    var view = {};
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
            button1.addEventListener('click', function(e) {e.preventDefault(); closeModal(modal)});
            button2.classList.add('btn', 'danger');
            button2.innerHTML = 'NO';
            button2.addEventListener('click', function(e) {e.preventDefault(); closeModal(modal)});
            buttons.classList.add('modal-buttons');
            buttons.appendChild(button1);
            buttons.appendChild(button2);
            return buttons;
        }
       
        function showModal(modal) {
            modal.style.display = 'block';
        }

        function attachEventsToButtons(button, fn) {
            button.addEventListener('click', function(e) {e.preventDefault(); fn()});
        }

        //create object to choose a hero
        function createChooseHeroesModal(heroImages) {
            var clickedImage,
            confirmButton,
            rejectButton;

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

            function onConfirm(fn) {
                attachEventsToButtons(confirmButton, fn);
            }

            function onReject(fn) {
                attachEventsToButtons(rejectButton, fn);
            }

            function getChosenImageSrc() {
                return clickedImage.getAttribute('src');
            }

            var modal = createModal(),
                modalContent = createModalContent(modal),
                modalImages = createModalImages(heroImages),
                modalText = addText('Choose your character!'),
                modalButtons = createButtons(modal);

            saveConfirmButton(modalButtons.firstElementChild);
            saveRejectButton(modalButtons.firstElementChild.nextSibling);
            attachEventToImages(modalImages, setClickedImage);
            modalContent.appendChild(modalImages);
            modalContent.appendChild(modalText);
            modalContent.appendChild(modalButtons);
            modal.appendChild(modalContent);
            appendToBody(modal);
            showModal(modal);

            return {
                onConfirm: onConfirm,
                onReject: onReject,
                getChosenImageSrc: getChosenImageSrc
            };
        }

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
                attachEventsToButtons(confirmButton, fn);
            }

            function onReject(fn) {
                attachEventsToButtons(rejectButton, fn);
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