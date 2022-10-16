//For some reason,JS Does not support Multi Class Definitons. Not fun. (Disabled For Now)
// ̶A̶ ̶m̶i̶x̶t̶u̶r̶e̶ ̶o̶f̶ ̶G̶e̶n̶e̶r̶i̶c̶C̶r̶a̶f̶t̶e̶r̶ ̶a̶n̶d̶ ̶P̶o̶w̶e̶r̶G̶e̶n̶e̶r̶a̶t̶o̶r̶ ̶i̶s̶ ̶u̶s̶e̶d̶ ̶h̶e̶r̶e̶.̶
//Apperantly ConsumeGenerator Exists. huh.

class TEMD_ItemDischarger extends ConsumeGenerator {
    constructor(Name){
        super(Name);
    }
  //Temp fix. (Overwrite with output item)
    updateTile(){
    let valid = efficiency > 0;

    warmup = Mathf.lerpDelta(warmup, valid ? 1 : 0, warmupSpeed);

    productionEfficiency = efficiency * efficiencyMultiplier;
    totalTime += warmup * Time.delta;

    //randomly produce the effect
    if(valid && Mathf.chanceDelta(effectChance)){
        generateEffect.at(x + Mathf.range(generateEffectRange), y + Mathf.range(generateEffectRange));
    }

    //take in items periodically
    if(hasItems && valid && generateTime <= 0){
        consume();
        consumeEffect.at(x + Mathf.range(generateEffectRange), y + Mathf.range(generateEffectRange));
        generateTime = 1;
    }

    if(outputLiquid != null){
        let added = Math.min(productionEfficiency * delta() * outputLiquid.amount, liquidCapacity - liquids.get(outputLiquid.liquid));
        liquids.add(outputLiquid.liquid, added);
        dumpLiquid(outputLiquid.liquid);

        if(explodeOnFull && liquids.get(outputLiquid.liquid) >= liquidCapacity - 0.0001){
            kill();
            Events.fire(new GeneratorPressureExplodeEvent(this));
        }
    }

    //generation time always goes down, but only at the end so consumeTriggerValid doesn't assume fake items
    generateTime -= delta() / itemDuration;
    }
}
