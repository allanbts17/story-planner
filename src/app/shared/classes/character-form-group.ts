import { FormControl, FormGroup, Validators } from "@angular/forms";

export class CharacerFormGroups {
  basic = new FormGroup({
    name: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    nickname: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl(''),
    birthdate: new FormControl(''),
    birthPlace: new FormControl(''),
    storyId: new FormControl('')
    // image: string|null;
  })

  appearance = new FormGroup({
    height: new FormControl(''),
    weight: new FormControl(''),
    skin: new FormControl(''),
    eyes: new FormControl(''),
    hair: new FormControl(''),
    distinguishableTraits: new FormControl(''),
    posture: new FormControl(''),
    otherPhysicalTrait: new FormControl(''),
    outfit: new FormControl(''),
    accessories: new FormControl('')
  })

  personality = new FormGroup({
    generalPersonality: new FormControl(''),
    qualities: new FormControl(''),
    defects: new FormControl(''),
    intelligence: new FormControl(''),
    habits: new FormControl(''),
    fears: new FormControl(''),
    skills: new FormControl(''),
    weaknesses: new FormControl(''),
  })

  reactions = new FormGroup({
    fear: new FormControl(''),
    sorprise: new FormControl(''),
    sadness: new FormControl(''),
    rejection: new FormControl(''),
    madness: new FormControl(''),
    anger: new FormControl(''),
    hapiness: new FormControl(''),
    anotherReaction: new FormControl(''),
    doubtPhrases: new FormControl(''),
    hapinessPhrases: new FormControl(''),
    sadnessPhrases: new FormControl(''),
    enthusiasmPhrases: new FormControl(''),
    angerPhrases: new FormControl(''),
    anotherPhrases: new FormControl(''),
  })

  home = new FormGroup({
    country: new FormControl(''),
    province: new FormControl(''),
    neighborhood: new FormControl(''),
    homeDescription: new FormControl(''),
    neighbors: new FormControl('')
  })

  relations = new FormGroup({
    character: new FormGroup([])
  })

  storyRole = new FormGroup({
    rol: new FormControl(''),// RolType|null;
    importantEvent: new FormControl(''),
    bestMemories: new FormControl(''),
    worstMemories: new FormControl('')
  })
}
