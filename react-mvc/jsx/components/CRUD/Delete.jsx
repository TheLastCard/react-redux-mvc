
//1#: You must link an item to the Delete component: <Delete item={<inset item here>}/>

//2#: You need to define one or several buttons. Two buttons are recommended if you are using a modal, Delete and Cancel, or simply a single delete button if you dont want a modal
//   <Delete buttons={deleteButtons}/>
//deleteButtons: [
//{
//    name: 'Cancel',
//    closeModalAfterAction: true,
//    className: 'button secondary float-right',
//    wrapperClassName: 'small-6 columns'
//},
//{
//    name: 'Delete',
//    action: (event, inputs, id) => CRUDRedux.dispatch({ type: 'DELETE', event: event, item: item }),
//    closeModalAfterAction: true,
//    className: 'button warning  float-left',
//    wrapperClassName: 'small-6 columns'
//}
//]

//3#: To show a confirm modal before deleting, add modal options
//    <Delete modal={yourModalOptions}/>
//var yourModalOptions = {
//    modalHeading: 'Delete item?',
//    modalHeadingClass: 'centered',
//    openModalButtonText: null,
//    openModalButtonClass: 'CRUDDeleteButton'
//}


define(['react'], function (React) {
    var Delete = React.createClass({
        modalId: '',
        getInitialState: function () {
            if (!this.props.item) {
                console.error("item is not defined on the Delete component! : <Delete item={undefined}>");
                return null;
            }
            if (!this.props.buttons) {
                console.error("buttons is not defined on the Delete component! : <Delete buttons={undefined}>");
            }

            return {
                buttons: this.props.buttons
            }
        },
        componentWillMount: function () {
            this.modalId = '#DeleteModal' + Math.floor((Math.random() * 10000) + 1).toString();
        },
        componentDidMount: function () {
            if(this.props.modal){
                $(this.modalId).foundation();
            }
        },
        buttonClickHandler: function (event, button, id) {
            event.preventDefault();
            if (button.action) {
                button.action(event, null, id);
            }

            if(this.props.modal){
                this.closeModal(this.modalId);
            }
        },
        createButtons: function () {
            var self = this;
            var id = this.props.item ? this.props.item.id : null;
            return this.state.buttons.map(function (button) {
                return (
                    <div key={button.name + 'wrapper'} className={button.wrapperClassName }>
                        <button key={button.name} id={button.name} className={button.className}
                                onClick={(event) => self.buttonClickHandler(event, button, id)}>
                            {button.name}
                        </button>
                    </div>
                );
            });
        },
        createModalHeading: function () {
            var self = this;
            if (self.props.modal && self.props.modal.modalHeading) {
                return (<h2 className={self.props.modal.modalHeadingClass }>{self.props.modal.modalHeading}</h2>);
            }
            return null;
        },
        render: function () {
            var self = this;

            if (!self.props.modal) {
                return (
                    <div>
                        {self.createButtons()}
                    </div>
                );
            }

            return (
                <div className={this.props.className}>
                    <button className={self.props.modal.openModalButtonClass} onClick={() =>self.openModal(self.modalId) }>{self.props.modal.openModalButtonText || ''}</button>

                    <div className="reveal" id={self.modalId.replace('#', '')} data-reveal>{self.createModalHeading()}{self.createButtons()}
                        <button className="close-button" aria-label="Close reveal" type="button" onClick={() =>self.closeModal(self.modalId)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            );
        },
        openModal: function (id) {
            $(id).foundation('open');
        },
        closeModal: function (id) {
            $(id).foundation('close');
        },
    });

    return Delete;
})