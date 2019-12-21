<?php

namespace App\Factory;

use App\Entity\Link;

class LinkFactory
{
  public function fromJson(string $json): Link
  {
    $data = json_decode($json);

    $link = new Link();
    $link
      ->setName($data->name)
      ->setDescription($data->description)
      ->setUrl($data->url);

    return $link;
  }
}
