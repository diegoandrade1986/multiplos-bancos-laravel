<?php

namespace App\Database;

use Illuminate\Database\MySqlConnection;

class MySqlConnectionWithPDOFix extends MySqlConnection {

    public function reconnect() {
        $this->doctrineConnection = null;
        return parent::reconnect();
    }

    public function disconnect() {
        $this->doctrineConnection = null;
        parent::disconnect();
    }
}