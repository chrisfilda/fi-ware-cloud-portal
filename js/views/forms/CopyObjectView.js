var CopyObjectView = Backbone.View.extend({

    _template: _.itemplate($('#copyObjectFormTemplate').html()),
    
    events: {
        'click #submit': 'onSubmit',
        'click #cancelBtn': 'close',
        'click #close': 'close',
        'click .modal-backdrop': 'close'
    },
    
    close: function(e) {
        $('#create_container').remove();
        $('.modal-backdrop').remove();
        this.onClose();
    },

    onClose: function () {
        this.undelegateEvents();
        this.unbind();
    },

    render: function () {
        if ($('#create_container').html() != null) {
            $('#create_container').remove();
            $('.modal-backdrop').remove();
        }
        $(this.el).append(this._template({model: this.model, title: this.options.title, container: this.containerName, model: this.options}));
        $('.modal:last').modal();
        return this;
    },
    
    onSubmit: function(e){
        e.preventDefault();  
		var self = this;   
		var currentContainer, currentObject, targetContainer, targetObject;
        if (this.$('input[name=objName]').val() === undefined) {  
          var subview = new MessagesView({el: '#content', state: "Error", title: "Wrong input values for container. Please try again."});     
          subview.render(); 
          return;
        } else {
        	currentContainer = this.model.get("name");
        	currentObject = this.options.title;
        	targetContainer = this.$("#container_switcher option:selected").val();        	
        	if (e.target.value === undefined || e.target.value === "") {
        		targetObject = this.$('input[name=objName]').val();
        	} else {
        		targetObject = e.target.value;
        	}
            var subview = new MessagesView({el: '#content', state: "Success", title: "Object " + targetObject + " copied to conatainer " + targetContainer});     
            subview.render();
        }   
        self.model.copyObject(currentContainer, currentObject, targetContainer, targetObject);    
    },
           
});
