const Machine = {
    /**
     * @param {number} id 
     * @param {TileEntity.TileEntityPrototype} Prototype 
     */
    init: function(id, Prototype){
        if(Prototype.defaultValues && Prototype.defaultValues.isActive !== undefined){
            if(!Prototype.renderModel){
                Prototype.renderModel = function(){
                    TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, this.data.meta + (this.data.isActive ? 4 : 0));
                }
            }
            Prototype.setActive = Prototype.setActive || function(isActive){
                if(this.data.isActive != isActive){
                    this.data.isActive = isActive;
                    if(this.data.isActive){
                        TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, 0);
                    } else TileRenderer.unmapAtCoords(this.x, this.y, this.z);
                }
            }
            Prototype.activate = Prototype.activate || function(){
                this.setActive(true);
            }
            Prototype.deactivate = Prototype.deactivate || function(){
                this.setActive(false);
            }
            Prototype.destroy = Prototype.destroy || function(){
                TileRenderer.unmapAtCoords(this.x, this.y, this.z);
            }
        }
        if(!Prototype.init && Prototype.renderModel){
            Prototype.init = Prototype.renderModel;
        }
        TileEntity.registerPrototype(id, Prototype);
    }
}