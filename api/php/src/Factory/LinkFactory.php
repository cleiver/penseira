<?php

namespace App\Factory;

use App\Entity\Link;
use App\Exception\EntityException;

class LinkFactory
{
  public function fromJson(string $json): Link
  {
    $data = json_decode($json);

    if (!property_exists($data, 'url')) {
      throw new EntityException('You must provide a URL for your link');
    }

    $link = new Link();
    $link
      ->setName($data->name)
      ->setDescription($data->description)
      ->setUrl($data->url);

    return $link;
  }
}
