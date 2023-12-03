pub mod command {
    use crate::data::{
        Error, FindSavedata, NatureMaster, Pokemon, PokemonMaster, Savedata, SeriesMaster,
    };
    use std::io::Write;
    use std::path::PathBuf;
    use std::{fs::metadata, fs::File, io::BufReader};
    fn get_data_directory() -> String {
        let path = PathBuf::from("data");
        match path.to_str() {
            Some(path_str) => path_str.to_string(),
            None => "".to_string(),
        }
    }
    #[tauri::command]
    pub fn get_all_savedata_list() -> Result<Vec<Savedata>, Error> {
        let mut savedatas: Vec<Savedata> = Vec::new();
        let dir = get_data_directory();
        let savedata_file_path = dir + "/savedata.json";
        match metadata(savedata_file_path.to_string()) {
            Ok(metadata) => {
                if metadata.is_file() {
                    let savedata_file = File::open(savedata_file_path).unwrap();
                    let savedata_reader = BufReader::new(savedata_file);
                    let json_to_savedata: Vec<Savedata> =
                        serde_json::from_reader(savedata_reader).unwrap();
                    savedatas.extend(json_to_savedata)
                } else {
                    println!("Path exists, but is not a file.");
                }
            }
            Err(_) => {
                println!("File does not exist.");
            }
        }
        Ok(savedatas)
    }

    fn find_pokemon_in_savedata(savedatas: Vec<Savedata>, pokemon_id: &str) -> Option<Pokemon> {
        for savedata in savedatas {
            for pokemon in savedata.pokemons {
                if pokemon.id == pokemon_id {
                    // 見つかった場合は、そのPokemonを返します。
                    return Some(pokemon);
                }
            }
        }
        // 見つからなかった場合は、Noneを返します。
        None
    }
    #[tauri::command]
    // param is pokemonId
    pub fn get_pokemon(pokemon_id: &str) -> Result<Pokemon, Error> {
        match get_all_savedata_list() {
            Ok(savedatas) => {
                let result = find_pokemon_in_savedata(savedatas, pokemon_id);

                match result {
                    Some(pokemon) => Ok(pokemon),
                    None => Err(Error {
                        error_message: "指定されたポケモンが見つかりません".to_string(),
                    }),
                }
            }
            Err(_) => Err(Error {
                error_message: "指定されたポケモンが見つかりません".to_string(),
            }),
        }
    }
    #[tauri::command]
    pub fn get_savedata(savedata_id: usize) -> Result<Savedata, Error> {
        println!("{}", savedata_id);

        match get_all_savedata_list() {
            Ok(savedatas) => {
                let result = savedatas
                    .iter()
                    .find(|savedata| savedata.id == savedata_id as u32);

                match result {
                    Some(savedata) => Ok(savedata.clone()),
                    None => Err(Error {
                        error_message: "指定されたセーブデータが見つかりません".to_string(),
                    }),
                }
            }
            Err(_) => Err(Error {
                error_message: "指定されたセーブデータが見つかりません".to_string(),
            }),
        }
    }
    #[tauri::command]
    pub fn get_savedata_with_all_series(savedata_id: usize) -> Result<FindSavedata, Error> {
        println!("{}", savedata_id);
        let all_series = get_all_series_master_list();

        match get_all_savedata_list() {
            Ok(savedatas) => {
                let result = savedatas
                    .iter()
                    .find(|savedata| savedata.id == savedata_id as u32);

                match result {
                    Some(savedata) => Ok(FindSavedata {
                        savedata: savedata.clone(),
                        all_series: all_series.clone(),
                    }),
                    None => Err(Error {
                        error_message: "指定されたセーブデータが見つかりません".to_string(),
                    }),
                }
            }
            Err(_) => Err(Error {
                error_message: "指定されたセーブデータが見つかりません".to_string(),
            }),
        }
    }
    #[tauri::command]
    pub fn get_all_pokemon_master_list() -> Vec<PokemonMaster> {
        let mut pokemon_master: Vec<PokemonMaster> = Vec::new();

        let dir = get_data_directory();
        let pokemon_master_file_path = dir + "/pokemonMaster.json";
        match metadata(pokemon_master_file_path.to_string()) {
            Ok(metadata) => {
                if metadata.is_file() {
                    let pokemon_master_file = File::open(pokemon_master_file_path).unwrap();
                    let pokemon_master_reader = BufReader::new(pokemon_master_file);
                    let json_to_pokemon_master: Vec<PokemonMaster> =
                        serde_json::from_reader(pokemon_master_reader).unwrap();
                    pokemon_master.extend(json_to_pokemon_master)
                } else {
                    println!("Path exists, but is not a file.");
                }
            }
            Err(_) => {
                println!("File does not exist.");
            }
        }
        pokemon_master
    }

    #[tauri::command]
    pub fn get_all_nature_master_list() -> Vec<NatureMaster> {
        let mut nature_master: Vec<NatureMaster> = Vec::new();

        let dir = get_data_directory();
        let nature_master_file_path = dir + "/natureMaster.json";
        match metadata(nature_master_file_path.to_string()) {
            Ok(metadata) => {
                if metadata.is_file() {
                    let master_file = File::open(nature_master_file_path).unwrap();
                    let reader = BufReader::new(master_file);
                    let json_to_data: Vec<NatureMaster> = serde_json::from_reader(reader).unwrap();
                    nature_master.extend(json_to_data)
                } else {
                    println!("Path exists, but is not a file.");
                }
            }
            Err(_) => {
                println!("File does not exist.");
            }
        }
        nature_master
    }

    #[tauri::command]
    pub fn get_all_series_master_list() -> Vec<SeriesMaster> {
        let mut series_master: Vec<SeriesMaster> = Vec::new();
        let dir = get_data_directory();
        let series_master_file_path = dir + "/seriesMaster.json";
        match metadata(series_master_file_path.to_string()) {
            Ok(metadata) => {
                if metadata.is_file() {
                    let series_master_file = File::open(series_master_file_path).unwrap();
                    let series_master_reader = BufReader::new(series_master_file);
                    let json_to_series_master: Vec<SeriesMaster> =
                        serde_json::from_reader(series_master_reader).unwrap();
                    series_master.extend(json_to_series_master)
                } else {
                    println!("Path exists, but is not a file.");
                }
            }
            Err(_) => {
                println!("File does not exist.");
            }
        }
        series_master
    }

    #[tauri::command]
    pub fn add_savedata(savedata: &str) -> Result<String, Error> {
        match get_all_savedata_list() {
            Ok(savedatas) => {
                let mut new_savedatas = savedatas;
                let max_id = new_savedatas.iter().map(|x| x.id).max().unwrap_or(0);
                let json_to_savedata: Savedata = serde_json::from_str(savedata).unwrap();
                let new_savedata = Savedata {
                    id: max_id + 1,
                    name: json_to_savedata.name,
                    series: json_to_savedata.series,
                    pokemons: json_to_savedata.pokemons,
                };
                new_savedatas.push(new_savedata);
                let json_string = serde_json::to_string(&new_savedatas).unwrap();
                println!("{}", json_string);

                let dir = get_data_directory();
                let savedata_file_path = dir + "/savedata.json";
                let mut file = File::create(savedata_file_path).unwrap();

                writeln!(file, "{}", json_string).unwrap();
                Ok("セーブデータを保存しました".to_string())
            }
            Err(_) => Err(Error {
                error_message: "セーブデータの保存に失敗しました".to_string(),
            }),
        }
    }
    #[tauri::command]
    pub fn save_savedata(savedata: &str) -> Result<String, Error> {
        match get_all_savedata_list() {
            Ok(savedatas) => {
                let mut new_savedatas = Vec::new();
                let json_to_savedata: Savedata = serde_json::from_str(savedata).unwrap();
                for savedata in savedatas {
                    print!("{}", json_to_savedata.id);
                    print!("{}", savedata.id);
                    if savedata.id == json_to_savedata.id {
                        println!("対象のデータを更新します");
                        new_savedatas.push(json_to_savedata.clone())
                    } else {
                        new_savedatas.push(savedata)
                    }
                }
                let json_string = serde_json::to_string(&new_savedatas).unwrap();
                println!("{}", json_string);
                let dir = get_data_directory();
                let savedata_file_path = dir + "/savedata.json";
                let mut file = File::create(savedata_file_path).unwrap();

                writeln!(file, "{}", json_string).unwrap();
                Ok("セーブデータを保存しました".to_string())
            }
            Err(_) => Err(Error {
                error_message: "セーブデータの保存に失敗しました".to_string(),
            }),
        }
    }
    #[tauri::command]
    pub fn delete_savedata(savedata_id: usize) -> Result<String, Error> {
        match get_all_savedata_list() {
            Ok(savedatas) => {
                let mut new_savedatas = Vec::new();
                for savedata in savedatas {
                    if savedata.id != savedata_id as u32 {
                        new_savedatas.push(savedata)
                    } else {
                    }
                }
                let json_string = serde_json::to_string(&new_savedatas).unwrap();
                println!("{}", json_string);
                let dir = get_data_directory();
                let savedata_file_path = dir + "/savedata.json";
                let mut file = File::create(savedata_file_path).unwrap();

                writeln!(file, "{}", json_string).unwrap();
                Ok("セーブデータを削除しました".to_string())
            }
            Err(_) => Err(Error {
                error_message: "セーブデータの削除に失敗しました".to_string(),
            }),
        }
    }

    #[tauri::command]
    pub fn save_pokemon(pokemon: &str) -> Result<String, Error> {
        println!("{}", pokemon);
        match get_all_savedata_list() {
            Ok(savedatas) => {
                let mut new_savedatas = Vec::new();
                let json_to_pokemon: Pokemon = serde_json::from_str(pokemon).unwrap();
                for savedata in savedatas {
                    let mut pokemons: Vec<Pokemon> = Vec::new();
                    for pokemon in savedata.pokemons {
                        if pokemon.id == json_to_pokemon.id {
                            pokemons.push(json_to_pokemon.clone())
                        } else {
                            pokemons.push(pokemon)
                        }
                    }
                    new_savedatas.push(Savedata {
                        id: savedata.id,
                        name: savedata.name,
                        series: savedata.series,
                        pokemons: pokemons.clone(),
                    })
                }
                let json_string = serde_json::to_string(&new_savedatas).unwrap();
                println!("{}", json_string);
                let dir = get_data_directory();
                let savedata_file_path = dir + "/savedata.json";
                let mut file = File::create(savedata_file_path).unwrap();

                writeln!(file, "{}", json_string).unwrap();
                Ok("セーブデータを保存しました".to_string())
            }
            Err(_) => Err(Error {
                error_message: "セーブデータの保存に失敗しました".to_string(),
            }),
        }
    }
}
