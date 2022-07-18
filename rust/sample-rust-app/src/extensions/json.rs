pub trait Jsonify {
    fn to_json(self) -> serde_json::Value;
}