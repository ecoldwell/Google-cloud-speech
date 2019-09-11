
const createInstructionsLanguageTag=(language)=>{
    let textValue=''
    let nextLanguageToggle=''
    positionY=.205
    if(language===LANGUAGES.ENGLISH){
        textValue='Francais'
        nextLanguageToggle=LANGUAGES.FRENCH
    }
    if(language===LANGUAGES.FRENCH){
        textValue='English'
        nextLanguageToggle=LANGUAGES.ENGLISH
    }
    if(currentDeviceType===DEVICE_TYPES.VR_HEADSET){
        positionY=.33
    }
    let textTag=document.createElement('a-entity')
    textTag.setAttribute('geometry','primitive:plane;width:.6; height:.3;')
    textTag.setAttribute('material','color:white;opacity:.0;')
    
    // textTag.setAttribute('id','instructions')
    textTag.setAttribute('class','clickable')
    textTag.setAttribute('enable-cursor','')

    textTag.setAttribute('position','.7 '+ positionY+' .1')
    textTag.setAttribute('text','value:'+textValue+';align:center; wrapCount:15; ')
    

    textTag.addEventListener('click',()=>{instructionsChangeLanguage(nextLanguageToggle)})
    return textTag
}

const createInstructionsTag=(language)=>{
    console.log('language', language)
    console.log('creating instructions tag')
    let instructionsGaze={
        [LANGUAGES.ENGLISH]:'Instructions\n\nTo use the video player during the experience, look down and gaze for a second once you have found the blue ring.\n\nWhen you are ready, click on "Play" and enter VR mode by clicking on the VR icon at the bottom of the screen.',
        [LANGUAGES.FRENCH]:"Instructions\n\nPour utiliser le lecteur vidéo durant l'expérience, regardez vers le bas et fixez l'anneau bleu que vous voyez apparaître durant une seconde.\n\nLorsque vous êtes prêts, cliquez sur 'Play' et entrez en mode VR en cliquant sur l'icône VR située en bas de l'écran."
    }
    let instructionsController={
        [LANGUAGES.ENGLISH]:'Instructions\n\nTo enter VR mode, click on the VR icon at the bottom right of the screen.\n\nUse the touchpad or press a button to make the video player appear/disappear.\n\nThen, press the trigger to use the controls of the video player.',
        [LANGUAGES.FRENCH]:"Instructions\n\nPour entrer en mode VR, cliquez sur l'icône située dans le coin inférieur droite de l'écran.\n\nUtilisez le pavé tactile ou appuyez sur un bouton pour faire apparaître/disparaître le lecteur video.\n\nEnsuite, utilisez la gâchette pour utiliser les contrôles du lecteur de vidéo."
    }
    console.log('creating instructions tag')
    let hasController=false
    let deviceType=currentDeviceType
    console.log('deviceType', deviceType)
    if(deviceType===DEVICE_TYPES.VR_HEADSET){
        hasController=true
    }
    // hasController=true
    let textValue=''
    if(hasController){
        textValue=instructionsController[language]
    }else{
        textValue=instructionsGaze[language]
    }
    console.log('textValue', textValue)

    let textTag=document.createElement('a-entity')
    textTag.setAttribute('geometry','primitive:plane;width:2; height:auto;')
    textTag.setAttribute('material','color:white;opacity:.15;')
    // textTag.setAttribute('id','instructions')
    textTag.setAttribute('class','clickable')
    textTag.setAttribute('only-show-cursor','')

  
    textTag.setAttribute('position','0 0 0')
    textTag.setAttribute('text','value:'+textValue+';align:center; wrapCount:45;')
    return textTag
}

const renderInstructions=(language)=>{
    let instructionsContainer=document.createElement('a-entity')
    instructionsContainer.setAttribute('position','0 1 -3')
    instructionsContainer.setAttribute('id','instructionsContainer')
    instructionsContainer.setAttribute('scale','1.5 1.5 1')

    instructionsContainer.appendChild(createInstructionsTag(language))
    instructionsContainer.appendChild(createInstructionsLanguageTag(language))
    console.log('rendering instructions')
    



    document.getElementsByTagName('a-scene')[0].appendChild(instructionsContainer)
}

const destroyInstructions=()=>{
    
    let instructionsContainerTag= document.getElementById('instructionsContainer')
    if(instructionsContainerTag){
        instructionsContainerTag.parentElement.removeChild(instructionsContainerTag)
    }
}

const instructionsChangeLanguage=(language)=>{
    currentLanguage=language
    destroyInstructions()
    renderInstructions(currentLanguage)
}