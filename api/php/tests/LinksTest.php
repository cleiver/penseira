<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class LinksTest extends WebTestCase
{
  private static $staticClient;

  public static function setUpBeforeClass()
  {
    self::$staticClient = static::createClient();
  }
  public function setUp()
  {
    $this->client = self::$staticClient;
  }

  public function testAuthenticatedUserCanCreateNewLink()
  {
    $token = $this->login();

    $link = [
      'name' => 'Bucket Test',
      'url' => 'https://bucket.url',
      'description' => 'sdds del.icio.us',
    ];

    $this->client->request(
      'POST',
      '/links',
      [],
      [],
      [
        'HTTP_AUTHORIZATION' => "Bearer {$token}",
        'CONTENT_TYPE' => 'application/json',
      ],
      json_encode($link)
    );

    $response = json_decode($this->client->getResponse()->getContent());

    self::assertEquals(201, $this->client->getResponse()->getStatusCode());
    self::assertEquals($link['name'], $response->name);
  }

  public function testUnauthenticatedUserCannotCreateNewLink()
  {
    $link = [
      'name' => 'Bucket Test',
      'url' => 'https://bucket.url',
      'description' => 'sdds del.icio.us',
    ];

    $this->client->request(
      'POST',
      '/links',
      [],
      [],
      [
        'CONTENT_TYPE' => 'application/json',
      ],
      json_encode($link)
    );

    $response = json_decode($this->client->getResponse()->getContent());

    self::assertEquals(401, $this->client->getResponse()->getStatusCode());
    self::assertEquals('Authentication failure', $response->error);
  }

  public function testAuthenticateUserCanRetrieveAllLinks()
  {
    $token = $this->login();

    $this->client->request('GET', '/links', [], [], [
      'HTTP_AUTHORIZATION' => "Bearer {$token}",
    ]);

    $response = json_decode($this->client->getResponse()->getContent());

    self::assertEquals(200, $this->client->getResponse()->getStatusCode());
    self::assertIsArray($response->data);
  }

  public function testUnuthenticatedUserCannotRetrieveAllLinks()
  {
    $this->client->request('GET', '/links');

    $response = json_decode($this->client->getResponse()->getContent());

    self::assertEquals(401, $this->client->getResponse()->getStatusCode());
    self::assertEquals('Authentication failure', $response->error);
  }

  public function testAuthenticatedUserCanUpdateALink()
  {
    $token = $this->login();

    $link = [
      'name' => 'Bucket Test',
      'url' => 'https://bucket.url',
      'description' => 'sdds del.icio.us',
    ];

    $link = $this->create($link, $token);

    $link->name = 'Updated Bucket';

    $this->client->request(
      'PUT',
      '/links/' . $link->id,
      [],
      [],
      [
        'HTTP_AUTHORIZATION' => "Bearer {$token}",
        'CONTENT_TYPE' => 'application/json',
      ],
      json_encode($link)
    );

    $response = json_decode($this->client->getResponse()->getContent());

    self::assertEquals(200, $this->client->getResponse()->getStatusCode());
    self::assertEquals($link->name, $response->name);
  }

  public function testUnauthenticatedUserCannotUpdateALink()
  {
    $token = $this->login();

    $link = [
      'name' => 'Bucket Test',
      'url' => 'https://bucket.url',
      'description' => 'sdds del.icio.us',
    ];

    $link = $this->create($link, $token);

    $link->name = 'Updated Bucket';

    $this->client->request(
      'PUT',
      '/links/' . $link->id,
      [],
      [],
      [
        'CONTENT_TYPE' => 'application/json',
      ],
      json_encode($link)
    );

    $response = json_decode($this->client->getResponse()->getContent());

    self::assertEquals(401, $this->client->getResponse()->getStatusCode());
    self::assertEquals('Authentication failure', $response->error);
  }

  public function testAuthenticatedUserCanDeleteALink()
  {
    $token = $this->login();

    $link = [
      'name' => 'Bucket Test',
      'url' => 'https://bucket.url',
      'description' => 'sdds del.icio.us',
    ];

    $link = $this->create($link, $token);

    $this->client->request(
      'DELETE',
      '/links/' . $link->id,
      [],
      [],
      [
        'HTTP_AUTHORIZATION' => "Bearer {$token}",
        'CONTENT_TYPE' => 'application/json',
      ],
      json_encode($link)
    );

    $response = json_decode($this->client->getResponse()->getContent());

    self::assertEquals(204, $this->client->getResponse()->getStatusCode());
  }

  public function testUnauthenticatedUserCannotDeleteALink()
  {
    $token = $this->login();

    $link = [
      'name' => 'Bucket Test',
      'url' => 'https://bucket.url',
      'description' => 'sdds del.icio.us',
    ];

    $link = $this->create($link, $token);

    $this->client->request(
      'DELETE',
      '/links/' . $link->id,
      [],
      [],
      [
        'CONTENT_TYPE' => 'application/json',
      ],
      json_encode($link)
    );

    $response = json_decode($this->client->getResponse()->getContent());

    self::assertEquals(401, $this->client->getResponse()->getStatusCode());
    self::assertEquals('Authentication failure', $response->error);
  }


  /**
   * Logs a user for testing endpoints
   * 
   * @return string access token
   */
  protected function login(): string
  {
    $this->client->request(
      'POST',
      '/login',
      [],
      [],
      [
        'CONTENT_TYPE' => 'application/json',
      ],
      json_encode([
        'email' => 'john@toe.tech',
        'password' => 123,
      ])
    );

    return json_decode($this->client->getResponse()->getContent())->access_token;
  }

  /**
   * Create a link for testing purposes
   */
  protected function create(array $link, string $token)
  {
    $this->client->request(
      'POST',
      '/links',
      [],
      [],
      [
        'HTTP_AUTHORIZATION' => "Bearer {$token}",
        'CONTENT_TYPE' => 'application/json',
      ],
      json_encode($link)
    );

    return json_decode($this->client->getResponse()->getContent());
  }
}
