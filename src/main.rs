use sqlx;
use std::{
    env::{args, current_dir},
    path::Path, fs,
};

fn main() {
    if let Some(action) = args().nth(1) {
        match action.as_str() {
            "init" => {
                if let Some(arg1) = args().nth(2) {
                    match arg1.as_str() {
                        "migration" => {
                            if let Some(current_dir) = current_dir().unwrap().to_str() {
                                let migrations_folder = format!("{}/migrations/v1", current_dir);
                                if Path::new(&migrations_folder).is_dir() {
                                    println!("A folder named 'migrations' already exists in the current directory");
                                    ()
                                }
                                if let Ok(_) = fs::create_dir_all(&migrations_folder){
                                    fs::File::create(format!("{}/up.sql", &migrations_folder)).unwrap();
                                    fs::File::create(format!("{}/down.sql", &migrations_folder)).unwrap();
                                }else {
                                    println!("Error while creating migrations folder");
                                    ()
                                }
                            } else {
                                println!("Something went wrong. Please try again or open an issue on the github repo and provide this code E001");
                                ()
                            }
                        }
                        _ => {
                            println!("Unrecognized action");
                            ()
                        }
                    }
                } else {
                    //Print some docs
                    println!("Print some docs");
                    ()
                }
            }
            "migrate" => {}
            _ => {
                println!("Unrecognized action")
            }
        }
    } else {
        println!("Deebee v1.0.0")
    }
}
