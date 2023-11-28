use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize)]
pub struct FindAllData {
    pub savedatas: Vec<Savedata>,
    pub pokemon_masters: Vec<PokemonMaster>,
    pub series_masters: Vec<SeriesMaster>,
}
#[derive(Serialize, Deserialize, Clone)]
pub struct FindSavedata {
    pub savedata: Savedata,
    pub all_series: Vec<SeriesMaster>,
}

#[derive(Serialize, Deserialize)]
pub struct Error {
    pub error_message: String,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Savedata {
    pub id: u32,
    pub name: String,
    pub series: SeriesMaster,
    pub pokemons: Vec<Pokemon>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Pokemon {
    pub nickname: String,
    pub id: String,
    pub level: u32,
    pub pokemon_master: PokemonMaster,
    pub defeated_pokemon: Vec<DefeatedPokemon>,
    pub effort_value: StatusValue,
    pub individual_value: StatusValue,
}
#[derive(Serialize, Deserialize, Clone)]
pub struct DefeatedPokemon {
    pub pokemon_master: PokemonMaster,
    pub defeated_count: u32,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct StatusValue {
    pub hp: u32,
    pub attack: u32,
    pub block: u32,
    pub concentration: u32,
    pub defense: u32,
    pub speed: u32,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct PokemonMaster {
    pub id: String,
    pub name: String,
    pub image: String,
    pub types: Vec<String>,
    pub get_effort_value: StatusValue,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct SeriesMaster {
    pub id: u32,
    pub name: String,
    pub max_effort_value: u32,
    pub max_individual_value: u32,
}
